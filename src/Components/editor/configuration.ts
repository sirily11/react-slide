import { Image, Text, Page, imagePosition as i, textAlignment } from "../slides/SliderObj";
import { t } from "@lingui/macro";
import { setupI18n } from "@lingui/core";
import zhMessages from "../../locales/zh/messages";

export const positionConfig: string[] = [i.left, i.right, i.top, i.center];
export const alignConfig: string[] = [textAlignment.left, textAlignment.right, textAlignment.center];
