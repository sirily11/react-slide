import { t } from '@lingui/macro';
import { setupI18n } from '@lingui/core'
import zhMessages from "../../locales/zh/messages";


const catalogs = {
  zh: zhMessages
}
const lr = setupI18n({
  language: "zh",
  catalogs: catalogs
})

// export let imagePosition = {
//   top : lr._(t`Top`),
//   right : lr._(t`Right`),
//   left: lr._(t`Left`),
//   center: lr._(t`Center`)
// }

export enum imagePosition {
  top = "Top",
  right = "Right",
  left = "Left",
  center = "Center"
}

enum Imageposition {
  right = "Right",
  left = "Left",
  center = "Center"
}

export enum textAlignment {
  right = "Right",
  left = "Left",
  center = "Center"
}

export enum PageContentMode {
  edit = "edit",
  display = "display"
}

export interface Page {
  image?: Image;
  text?: Text;
  backgroundColor?: string;
}

export interface Image {
  src: string;
  fullscreen: boolean;
  position?: Imageposition;
}

export interface Text {
  titleText: string;
  textAlignment: any;
  contentText: string;
  position: string;
  useBackground: boolean;
  background?: string;
  shadow: boolean;
  shadowColor: string;
  shadowX: number;
  shadowY: number;
  color?: string;
}

export class SliderObj {
  pages: Page[];

  constructor() {
    this.pages = [];
  }

  setPage(at: number, newPage: Page): SliderObj {
    this.pages[at] = newPage;
    return this;
  }

  addPage(newPage?: Page): SliderObj {
    if (!newPage) {
      let page: Page = {
        image: undefined,
        text: undefined
      };
      this.pages.push(page);
    } else {
      this.pages.push(newPage);
    }
    return this;
  }

  removePage(at: number): SliderObj {
    this.pages.splice(at, 1);
    return this;
  }

  toJSON(): string {
    return JSON.stringify(this.pages);
  }

  toJSONObj(): Page[] {
    return this.pages
  }

  fromJSON(
    json: string,
    onSuccess?: (pages: Page[]) => void,
    onError?: (errMsg: string) => void
  ) {
    let obj: object[] = JSON.parse(json);
    try {
      this.pages = obj.map((page: Page) => {
        return page;
      });
      if (onSuccess) {
        onSuccess(this.pages);
      }
    } catch (err) {
      if (onError) onError(err);
    }
  }
}
