import fs from 'fs';
import config from '../../config';
import path from 'path';
import sizeOf from 'image-size';
import stringifyAttributes from 'stringify-attributes';

const generateSrcSet = (basepath, srcMap, ext) => {
  return srcMap.map(candidate => {
    return `${basepath}@${candidate.width}${ext} ${candidate.density}`;
  }).join(', ');
}

const generateMedia = (basepath, screenMap, ext, webp = false) => {
  return screenMap.map((candidate, index) => {
    let output;

    if(index === 0 && screenMap.length === 1) {
      output = `<source media="(min-width: ${next}px)"`;
    } else if(index < screenMap.length - 1){
      let next = screenMap[index+1].screen - 1;
      if(candidate.screen == 0) {
        output = `<source media="(max-width: ${next}px)"`;
      } else {
        output = `<source media="(min-width: ${candidate.screen}px) and (max-width: ${next}px)"`;
      }
    } else {
      output = `<source media="(min-width: ${candidate.screen}px)"`;
    }

    if(webp) {
      output += ' type="image/webp"';
    }
    output += ` srcset="${basepath}@${candidate.width*2}${ext} 2x, ${basepath}@${candidate.width}${ext} 1x" />`;
    return output;
  }).join('');
}

const generatePicture = (url, src, srcset, webp, placeholder, attributes) => {
  const file = path.join(config.paths.build, url);

  const {ext, dir, name, base} = path.parse(url);
  const basepath = `${dir}/${name}`;

  if(srcset) {
    srcset = srcset.split(',');
  } else {
    srcset = [];
  }

  let srcMap = [];
  let screenMap = [];

  srcset.forEach(function(candidate) {
    candidate = candidate.trim();

    if(/^\d+$/.test(candidate)) {
      srcMap.push({
        width: parseInt(candidate, 10),
        density: `${candidate}w`
      });
    } else if(/^\d+\s+[a-z]+$/.test(candidate)) {
      const found = candidate.match(/^(\d+)\s+([a-z]+)$/);
      let screen = found[2];
      let density = found[2];

      if(config.breakpoints.hasOwnProperty(screen)){
        screenMap.push({
          width: parseInt(found[1], 10),
          screen: config.breakpoints[screen]
        });
      }
    } else if(/^\d+\s+\d+$/.test(candidate)) {
      const found = candidate.match(/^(\d+)\s+(\d+)$/);

      srcMap.push({
        width: parseInt(found[1], 10),
        density: `${found[2]}w`
      });
    } else if(/^\d+\s+\d+w$/.test(candidate)) {
      const found = candidate.match(/^(\d+)\s+(\d+w)$/);

      srcMap.push({
        width: parseInt(found[1], 10),
        density: found[2]
      });
    }
  });

  srcMap.sort(function(a, b) {
    return a.width - b.width;
  });
  screenMap.sort(function(a, b) {
    return a.screen - b.screen;
  });

  if(!src) {
    if(screenMap.length > 0) {
      src = screenMap[0].width;
    } else if(srcMap.length > 0) {
      src = srcMap[0].width;
    } else {
      src = null;
    }
  }

  let output = '';

  if(fs.existsSync(file)) {
    
    if(placeholder === 'true' || placeholder === true) {
      output = `<div class="image"`;
      const dimensions = sizeOf(file);
      const padding = 100*(dimensions.height/dimensions.width);

      output += ` style="padding-bottom: ${padding.toFixed(3)}%">`;
    }
    output += '<picture>';

    if(webp === 'true' || webp === true) {
      output += generateMedia(basepath, screenMap, '.webp', true);
      output += `<source type="image/webp"`;

      if(srcMap.length > 0) {
        output += ` srcset="${generateSrcSet(basepath, srcMap, '.webp')}" />`;
      } else if(src !== null) {
        output += ` srcset="${basepath}@${src}.webp" />`;
      } else {
        output += ` srcset="${basepath}.webp" />`;
      }
    }

    output += generateMedia(basepath, screenMap, ext);

    if(srcMap.length > 0) {
      output += `<source srcset="${generateSrcSet(basepath, srcMap, ext)}" />`;
    }

    if(src) {
      output += `<img src="${basepath}@${src}${ext}" ${stringifyAttributes(attributes)} />`;
    } else {
      output += `<img src="${url}" ${stringifyAttributes(attributes)} />`;
    }

    output += '</picture>';

    if(placeholder === 'true' || placeholder === true) {
      output += '</div>';
    }
  } else {
    output = `<img src="${url}" ${stringifyAttributes(attributes)} />`;
  }

  return output;
}
