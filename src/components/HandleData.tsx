import { FC } from "react";
import { SocialNetwork, UserHandle } from "../types";

type HandleDataProps = {
  data: UserHandle;
};

export const HandleData: FC<HandleDataProps> = ({ data }) => {
  const links: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => link.enabled
  );

  return (
    <div className="space-y-6 text-white">
      <p className="text-5xl text-center font-black">{data.handle}</p>
      {data.image && (
        <img
          src={data.image}
          alt="logo image"
          className="mx-w-[250px] mx-auto"
        />
      )}
      <p className="text-balance text-center font-bold">{data.description}</p>
      <div className="mt-20 flex flex-col gap-6">
        {links.length ? (
          links.map((link) => (
            <a
              key={link.id}
              className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src={`/social/icon_${link.name}.svg`}
                alt={"icon for " + link.name}
                className="w-12"
              />
              <p className="text-black capitalize font-bold text-lg">
                Visit my: {link.name}
              </p>
            </a>
          ))
        ) : (
          <p className="text-center">There isn't links in this profile</p>
        )}
      </div>
    </div>
  );
};
