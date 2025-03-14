import browserSync from 'browser-sync';
import { deleteAsync } from 'del';
import pkg from 'gulp';
import fileinclude from 'gulp-file-include';
import gulpIf from 'gulp-if';
import newer from 'gulp-newer';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import gulpSass from 'gulp-sass';
import ttf2woff2 from 'gulp-ttf2woff2';
import webp from 'gulp-webp';
import * as dartSass from 'sass';
import TerserPlugin from 'terser-webpack-plugin';
import webpackStream from 'webpack-stream';
import { hideBin } from 'yargs/helpers';

const isDevelopment = hideBin( process.argv ).includes( '--dev' );
const { dest, parallel, series, src, watch } = pkg;
const sass = gulpSass( dartSass );

const paths = {
  html: {
    src: 'src/*.html',
    dest: 'dist/',
    watch: 'src/**/*.html'
  },
  styles: {
    src: 'src/styles/main.sass',
    dest: 'dist/styles/',
    watch: 'src/styles/**/*.sass'
  },
  scripts: {
    src: 'src/scripts/main.js',
    dest: 'dist/scripts/',
    watch: 'src/scripts/**/*.js'
  },
  images: {
    src: 'src/images/**/*.{png,jpg,jpeg,gif,svg,webp}',
    dest: 'dist/images/',
    watch: 'src/images/**/*.{png,jpg,jpeg,gif,svg,webp}'
  },
  fonts: {
    src: 'src/fonts/**/*.{ttf,woff2}',
    dest: 'dist/fonts/',
    watch: 'src/fonts/**/*.{ttf,woff2}'
  }
};

function server() {
  browserSync.init( {
    server: { baseDir: 'dist/' },
    notify: false,
    open: false
  } );
}

function watcher() {
  watch( paths.html.watch, parallel( html, styles ) );
  watch( paths.styles.watch, styles );
  watch( paths.scripts.watch, scripts );
  watch( paths.images.watch, images );
  watch( paths.fonts.watch, fonts );
}

async function clean() {
  return await deleteAsync( [ 'dist/' ] );
}

function html() {
  return src( paths.html.src )
    .pipe( fileinclude() )
    .pipe( dest( paths.html.dest ) )
    .pipe( browserSync.stream() );
}

function styles() {
  return src( paths.styles.src )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( postcss() )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( dest( paths.styles.dest ) )
    .pipe( browserSync.stream() );
}

function scripts() {
  return src( paths.scripts.src )
    .pipe( webpackStream( {
      mode: isDevelopment ? 'development' : 'production',
      output: { filename: 'main.min.js' },
      optimization: { minimizer: isDevelopment ? [] : [ new TerserPlugin() ] },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: '/node_modules',
            use: 'babel-loader'
          }
        ]
      }
    } ) )
    .pipe( dest( paths.scripts.dest ) )
    .pipe( browserSync.stream() );
}

function images() {
  return src( paths.images.src )
    .pipe( newer( { dest:paths.images.dest, ext: '.webp' } ) )
    .pipe( newer( { dest:paths.images.dest, ext: '.svg' } ) )
    .pipe( gulpIf( file => [ '.png', '.jpg', '.jpeg' ].includes( file.extname ), webp( { quality: 90 } ) ) )
    .pipe( dest( paths.images.dest ) )
    .pipe( browserSync.stream() );
}

function fonts() {
  return src( paths.fonts.src, { encoding: false } )
    .pipe( newer( { dest: paths.fonts.dest, ext: '.woff2' } ) )
    .pipe( gulpIf( file => [ '.ttf' ].includes( file.extname ), ttf2woff2() ) )
    .pipe( dest( paths.fonts.dest ) )
    .pipe( browserSync.stream() );
}

const build = series( clean, fonts, images, parallel( html, styles, scripts ), isDevelopment ? parallel( server, watcher ) : () => Promise.resolve() );
const preview = server;

export { build as default, preview };
