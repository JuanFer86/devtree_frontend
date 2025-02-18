import { ChangeEvent, useEffect, useState } from "react";
import { social } from "../data/social";
import { DevTreeInput } from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/devTreeApi";
import { SocialNetwork, UserTypes } from "../types";

function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient();
  const user: UserTypes = queryClient.getQueryData(["user"]) as UserTypes;
  const links: SocialNetwork[] = JSON.parse(user.links);

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
  });

  useEffect(() => {
    const updatedData = devTreeLinks.map((item) => {
      const userLink = (JSON.parse(user.links) as SocialNetwork[]).find(
        (link) => link.name === item.name
      );
      if (userLink)
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      return item;
    });

    setDevTreeLinks(updatedData);
  }, []);

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) => {
      return link.name === e.target.name
        ? { ...link, url: e.target.value }
        : link;
    });

    setDevTreeLinks(updatedLinks);

    // if (isValidUrl(e.target.value)) {
    //   queryClient.setQueryData(["user"], (prev: UserTypes) => ({
    //     ...prev,
    //     links: JSON.stringify(updatedLinks),
    //   }));
    // }
  };

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) return { ...link, enabled: !link.enabled };
        toast.error("Invalid URL");
      }
      return link;
    });

    setDevTreeLinks(updatedLinks);

    let updatedItems: SocialNetwork[] = [];

    const selectedSocialNetWork = updatedLinks.find(
      (link) => link.name === socialNetwork
    );

    if (selectedSocialNetWork?.enabled) {
      const id = links.filter((link) => link.id).length + 1;
      if (links.some((link) => link.name === socialNetwork)) {
        updatedItems = links.map((link) => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              id,
              enabled: true,
              url: selectedSocialNetWork?.url,
            };
          } else {
            return link;
          }
        });
      } else {
        const newItem = {
          ...selectedSocialNetWork,
          id,
        };

        updatedItems = [...links, newItem];
      }
    } else {
      const indexToUpdate = links.findIndex(
        (link) => link.name === socialNetwork
      );
      updatedItems = links.map((link) => {
        if (link.name === socialNetwork) {
          return {
            ...link,
            id: 0,
            enabled: false,
            url: selectedSocialNetWork?.url || "",
          };
        } else if (
          link.id > indexToUpdate &&
          indexToUpdate !== 0 &&
          link.id === 1
        ) {
          return {
            ...link,
            id: link.id - 1,
          };
        } else {
          return link;
        }
      });
    }

    console.log({ updatedItems });

    //add to DB
    queryClient.setQueryData(["user"], (prev: UserTypes) => ({
      ...prev,
      links: JSON.stringify(updatedItems),
    }));
  };

  return (
    <>
      <div className="space-y-5">
        {devTreeLinks.map((item) => (
          <DevTreeInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnableLink={handleEnableLink}
          />
        ))}
        <button
          className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
          onClick={() =>
            mutate(queryClient.getQueryData(["user"]) as UserTypes)
          }
        >
          Save Changes
        </button>
      </div>
    </>
  );
}

export default LinkTreeView;
