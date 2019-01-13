module.exports = {
  title: "Hello VuePress",
  description: "Just playing around",

  plugins: [
    (options, ctx) => {
      const Prism = require("prismjs");
      const loadLanguages = require("prismjs/components/");
      loadLanguages(["javascript", "typescript", "php"]);

      Prism.languages.hbshtml = {
        comment: /<!--[\s\S]*?-->/,
        prolog: /<\?[\s\S]+?\?>/,
        doctype: /<!DOCTYPE[\s\S]+?>/i,
        cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
        "whole-tag": {
          pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
          greedy: true,
          inside: {
            tag: {
              pattern: /^<\/?[^\s>\/]+/i,
              inside: {
                punctuation: /^<\/?/,
                namespace: /^[^\s>\/:]+:/
              }
            },
            whitespace: /^\s+/,
            arg: {
              pattern: /^@[^\s>\/]+=\{\{.*?\}\}/,
              inside: {
                "arg-name": {
                  pattern: /^@[^=]+/,
                  alias: ["symbol", "italic"]
                },
                equals: { pattern: /^=/, alias: "punctuation" },
                "arg-value": {
                  pattern: /^.*/i,
                  inside: Prism.languages.htmlbars
                }
              }
            },

            stringArg: {
              pattern: /^@[^\s>\/]+="[^"]*"/,
              inside: {
                "arg-name": {
                  pattern: /^@[^=]+/,
                  alias: ["symbol", "italic"]
                },
                equals: { pattern: /^=/, alias: "punctuation" },
                string: {
                  pattern: /^.*/i
                }
              }
            },

            "attr-value": {
              pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
              inside: {
                punctuation: /^=/,
                string: /^.*/
              }
            },

            punctuation: /\/?>/,

            "attribute-name": {
              pattern: /[^\s>\/@]+/,
              alias: ["italic", "comment"],
              inside: {
                namespace: /^[^\s>\/:]+:/
              }
            }
          }
        },
        entity: /&#?[\da-z]{1,8};/i
      };

      Prism.languages.markup["tag"].inside["attr-value"].inside["entity"] =
        Prism.languages.markup["entity"];

      let hbsIdent = /[^!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~\s]+/;

      let inMustache = {
        pattern: /^[^}]+/,
        inside: {
          keyword: /^\s*as\s*(?=|)/,

          hash: {
            pattern: /[^!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~\s]+=/,
            inside: {
              name: {
                pattern: hbsIdent,
                alias: ["symbol", "italic"]
              },
              punctuation: /^=/
            }
          },
          string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
          number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
          boolean: /\b(?:true|false)\b/,
          block: {
            pattern: /^(\s*~?\s*)[#\/]\S+?(?=\s*~?\s*$|\s)/i,
            lookbehind: true,
            alias: "keyword"
          },
          brackets: {
            pattern: /\[[^\]]+\]/,
            inside: {
              punctuation: /\[|\]/,
              variable: /[\s\S]+/
            }
          },
          punctuation: /[!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]/,
          variable: hbsIdent
        }
      };

      Prism.languages.htmlbars = Prism.languages.extend("hbshtml", {
        comment: /\{\{![\s\S]*?\}\}/,
        block: {
          pattern: /\{\{[#/][\s\S]*?\}\}/,
          inside: {
            start: { pattern: /^\{\{[#/]/, alias: ["delimiter", "important"] },
            function: /^[^!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~\s]+/,
            contents: inMustache,
            end: { pattern: /^\}\}/, alias: ["delimiter", "important"] }
          }
        },
        mustache: {
          pattern: /\{\{[\s\S]*?\}\}/,
          inside: {
            start: { pattern: /^\{\{/, alias: ["delimiter", "important"] },
            when: {
              pattern: /^when\s+:[^!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~\s]+/,
              inside: {
                function: /^when/,
                symbol: /^.*/
              }
            },
            function: /^[^!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~\s]+(?=[ \}])/,
            contents: inMustache,
            end: { pattern: /^\}\}/, alias: ["delimiter", "important"] }
          }
        }
      });

      Prism.languages.gbs = {
        hbsOnly: {
          pattern: /^((?!---)[\s\S])*$/,
          inside: {
            hbs: {
              alias: "language-handlebars",
              pattern: /^[\s\S]*/,
              inside: Prism.languages.htmlbars
            }
          }
        },

        jsComment: {
          pattern: /--- js ---[\s\S]*?(?=---)/,
          inside: {
            head: {
              pattern: /^--- js ---/,
              alias: ["function-name", "type-header", "italic"]
            },
            js: {
              pattern: /^[\s\S]*/,
              lookbehind: true,
              alias: "language-js",
              inside: Prism.languages.javascript
            }
          }
        },

        tsComment: {
          pattern: /--- ts ---[\s\S]*?(?=---)/,
          inside: {
            head: {
              pattern: /^--- ts ---/,
              alias: ["function-name", "type-header", "italic"]
            },
            ts: {
              alias: "language-ts",
              pattern: /^[\s\S]*/,
              inside: Prism.languages.typescript
            }
          }
        },

        hbsComment: {
          pattern: /--- hbs ---[\s\S]*$/,
          inside: {
            head: {
              pattern: /^--- hbs ---/,
              alias: ["function-name", "type-header", "italic"]
            },
            hbs: {
              alias: "language-handlebars",
              pattern: /^[\s\S]*/,
              inside: Prism.languages.htmlbars
            }
          }
        },

        phpComment: {
          pattern: /--- php[\s\S]*$/,
          alias: "function-name",
          inside: {
            head: {
              pattern: /^--- php/,
              alias: "function-name"
            },
            php: {
              pattern: /^[\s\S]*/,
              lookbehind: true,
              inside: Prism.languages.php
            }
          }
        }
      };

      return {
        base: "/ember-next-experiments"
      };
    }
  ]
};
