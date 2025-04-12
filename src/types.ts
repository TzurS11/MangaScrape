export type axiosProxy = {
  auth?: { password: string; username: string };
  host: string;
  port: number;
  protocol?: ProxyType;
};

type ProxyType = "http" | "https" | "socks5" | "socks5h";

export type Options = {
  proxy?: axiosProxy;
  /**
   * Whether or not to use cahce. Default is to use cache. saved on a Map object
   */
  cache?: boolean;
};
