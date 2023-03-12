import { useEffect } from "react";

function MapApiTest() {
  const [location, setLocation] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/hospital')
      .then(response => {
        setLocation(response.data);
      });
  }, []);

  return(
    <>
    </>
  );
}

export default MapApiTest;