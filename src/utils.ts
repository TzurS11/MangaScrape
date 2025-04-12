import { JSDOM } from "jsdom";
import axios, { AxiosResponse } from "axios";
import { axiosProxy, Options } from "./types";

const cache = new Map<string, Document>();

export async function fetchHTML(
  url: string,
  options?: Options,
  headers?: Record<string, string>
): Promise<Document> {
  try {
    if (
      (options.cache == true || options.cache == undefined) &&
      cache.has(url)
    ) {
      return cache.get(url);
    }

    const proxy = options.proxy;
    let response: AxiosResponse<string, any>;
    const axiosConfig = {
      headers: headers || {},
      proxy:
        proxy && proxy.host && proxy.port
          ? {
              host: proxy.host,
              port: proxy.port,
              auth: proxy.auth ? proxy.auth : undefined,
            }
          : undefined,
    };

    response = await axios.get(url, axiosConfig);

    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    if (options.cache == true || options.cache == undefined) {
      cache.set(url, document);
    }
    return document;
  } catch (e) {
    throw {
      status: e.status,
      message:
        "Failed to fetch HTML.\nTry the following things:\n- Check your internet connection\n- Check if the website is up\n- Check if the website has blocked your IP address\n- Check if the website has blocked the proxy server\n- Change the base URL",
    };
  }
}

export function findElementByText(
  parent: Element,
  text: string
): Element | null {
  const elements = Array.from(parent.querySelectorAll("*"));
  return (
    elements.find((element) =>
      element.textContent?.toLowerCase().includes(text.toLowerCase())
    ) || null
  );
}

export function querySelectorAllRegex(
  document: Document | Element,
  attribute: string,
  regex: RegExp
): Element[] {
  const regexPattern = regex;

  // Select all elements with the attribute 'data-custom-attribute'
  const elementsWithAttribute = document.querySelectorAll(`[${attribute}]`);

  // Filter elements based on the regular expression pattern
  const matchingElements = Array.from(elementsWithAttribute).filter(
    (element) => {
      const attributeValue = element.getAttribute(attribute) || "";
      return regexPattern.test(attributeValue);
    }
  );
  return matchingElements;
}

export function buildUrl(baseUrl: string, params: Record<string, string>) {
  const url = new URL(baseUrl); // Create a URL object

  // Append parameters using URLSearchParams
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  return decodeURIComponent(url.toString());
}
