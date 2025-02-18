import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getUserByHandle } from "../api/devTreeApi";
import { HandleData } from "../components/HandleData";

const HandleView = () => {
  const { handle } = useParams();

  const { data, error, isLoading } = useQuery({
    queryFn: () => getUserByHandle(handle as string),
    queryKey: ["handle", handle],
    retry: 1,
  });

  if (isLoading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <Navigate to="/404" />;

  if (data) return <HandleData data={data} />;
};

export default HandleView;
