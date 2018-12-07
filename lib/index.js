const fs = require('fs');
const {spawn} = require('child_process');
const argv = process.argv;

async function main()
{ const root = fs.readFileSync(argv[2], {encoding:'utf8'});

  commands = argv.slice(3);

  let imports = [];
  
  let output = root.replace(/#include (.+)/ig, (match, m1) =>
  { const index = imports.push
    ( new Promise
      ( (resolve, reject) => 
        { fs.readFile(m1, {encoding:'utf8'}, (err, config) =>
          { if(err)
            { return reject(err);
            }

            resolve
            ( processPartial(config)
            );
          });
        }
      )
    ) - 1;

    return `#include [${index}]`;
  });

  imports = await Promise.all(imports);

  output = output.replace(/#include \[(.+?)\]/ig, (match, index) =>
  { return imports[parseInt(index)];
  });

  process.stdout.write(`${output}\n`);
}

const processPartial = (config) =>
{ if(config.indexOf('#@') == -1)
  { return config;
  }

  const aliases = [];

  config = config.replace(/#(@.+?):(.+)\n/ig, (match, alias, path) =>
  { aliases.push
    ({
      match: alias
    , path: path
    });
    return '';
  });

  aliases.forEach((alias) =>
  { const regexp = new RegExp(alias.match, 'ig');
    config = config.replace
    ( regexp
    , alias.path
    );
  });

  return config;
}

main();