export type axiosProxy = {
  auth?: { password: string; username: string };
  host: string;
  port: number;
  protocol?: ProxyType;
};

type ProxyType = "http" | "https" | "socks5" | "socks5h";

export type Options = {
  proxy?: axiosProxy;
};

export type MAIN_OPTIONS = {
  proxy?: axiosProxy;
};
