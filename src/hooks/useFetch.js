import { useEffect, useRef, useState } from "react";

function useFetch(url, _option) {
  // fetch -> first render -> useEffect
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  // obj && array so yin useRef or useState use loz ya
  // useState use yin setter function ka po ny loz 80% useRef use kya

  // useEffect
  // let [option, setOption] = useState(_option);

  // useRef
  let option = useRef(_option).current;

  useEffect(() => {
    console.log(option);
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
  return { data, loading, error, _option };
}

export default useFetch;
