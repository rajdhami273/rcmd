const ejs = require("ejs");
const fs = require("fs");

const content = {
  page: (type, fileName) => {
    const classBased = `class ${fileName} extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
        
    render() {
        return (
            <></>
        );
    }
    
}`;
    const functional = `
const ${fileName} = (props) => {
    return (
        <></>
    );
}`;
    const main = (pageTypeTemplate) => {
      return `import React from "react";
import css from "./${fileName}.module.scss";

    ${pageTypeTemplate}

export default ${fileName};`;
    };
    if (type === "f" || type === "functional") {
      return main(functional);
    }
    if (type === "c" || type === "class") {
      return main(classBased);
    }
    console.log("No page type given so generating page as Functional Component.")
    return main(functional);
  },
};

const createFile = (dir, file, content) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dir)) {
      return resolve();
    } else {
      try {
        const d = fs.mkdirSync(dir, { recursive: true });
        return resolve();
      } catch (err) {
        reject(err);
      }
    }
  }).then(() => {
    if (fs.existsSync(dir + file)) {
      return Promise.resolve(`${dir + file} already exists`);
    } else {
      return new Promise((resolve, reject) => {
        fs.writeFile(dir + file, content, (err) => {
          if (err) {
            return reject(err);
          }
          return resolve(dir + file + " added");
        });
      });
    }
  });
};

module.exports = (moduleType, path, type) => {
  const fileName = path.split("/").pop();
  switch (moduleType) {
    case "page":
      const routeName = path.split("/");
      console.log(type);
      const c1 = ejs.render(
        content.page(type, fileName),
        { entityTarget: path },
        {}
      );
      createFile(`${path}/`, `${fileName}.jsx`, c1)
        .then((result) => {
          console.log(result);
          const c2 = ejs.render("", { entityTarget: path }, {});
          return createFile(`${path}/`, `${fileName}.module.scss`, c2);
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log("Some error", err);
        });
      break;

    default:
      console.log(moduleType);
      break;
  }
};
