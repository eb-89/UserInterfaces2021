
/**
 *  Driver class for internalization
 *  lang/lang.js
 *
 *
 */

import {en} from "./en.js";
import {sv} from "./sv.js";


export default class Lang {
  constructor() { 
    this.langs= {
      en: {
        name: "en",
        data: en
      },
      sv: {
        name: "sv",
        data: sv
      },
    }
    this.currentLang = this.langs.sv
  }

  changeCurrentLanguage(lang) {
    switch(lang) {
      case 'en':
        this.currentLang = this.langs.en;
        break;
      case 'sv':
        this.currentLang = this.langs.sv;
        break;
    }
  }

  getCurrentLanguage() {
    return this.currentLang.name
  }

  /**   Generates strings from the json files.
   *    Expects a JQuery Object as input
   */

  generateStrings(element) {
    element.find("[data-textid]").each((idx, val) => {
      let key = $(val).attr("data-textid")
      $(val).text(this.currentLang.data[key])
    })
  }


}