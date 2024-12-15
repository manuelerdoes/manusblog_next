import { useEffect, useState } from "react";

function getTopicData() {
  return sessionStorage?.getItem('topic');
}

export default function useTopicData() {
  const [topic, setTopic] = useState(getTopicData());

  useEffect(() => {
    function handleChangeStorage() {
      setTopic(getTopicData());
    }

    window.addEventListener('storage', handleChangeStorage);
    return () => window.removeEventListener('storage', handleChangeStorage);
  }, []);

  return topic;
}