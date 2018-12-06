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
        { fs.readFile(m1, {encoding:'utf8'}, (err, data) =>
          { if(err)
            { return reject(err);
            }

            resolve(data);
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

main();