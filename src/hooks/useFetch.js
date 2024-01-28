import { useEffect, useState } from "react";

function useFetch(url) {
  // fetch -> first render -> useEffect
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  useEffect(() => {
    let controller = new window.AbortController();
    let signal = controller.signal;
    setLoading(true);
    fetch(url, {
      signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
    // clean up function
    return () => {
      console.log("clean up running");
      controller.abort();
    };
  }, [url]);
  //   output -> api's data
  return { data, loading, error };
}

export default useFetch;
