import React, { useEffect, useState } from "react";
import Loader from "../../shared/Loader/Loader";
import Navbar from "../../shared/Navbar/Navbar";

const Home = () => {
  const [houses, setHouses] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("houses.json")
      .then((res) => res.json())
      .then((data) => {
        setHouses(data);
        setData(data);
      });
  }, []);

  const onSearchHandler = (event) => {
    setLoading(true);
    event.preventDefault();
    const location = event.target.location.value;
    const bed = event.target.bed.value;
    const price = event.target.price.value;
    const propertyType = event.target.propertyType.value;
    console.log(location, bed, price, propertyType);

    if (location !== "" || bed !== "" || price !== "" || propertyType !== "") {
      const filterData = houses.filter(
        (house) =>
          house.location.toLowerCase().includes(location.toLowerCase()) &&
          house.popertyType === propertyType &&
          house.price >= price &&
          house.bed === parseInt(bed)
      );
      setData(filterData);
      setLoading(false);
    } else {
      setData(houses);
      setLoading(false);
    }
  };
  return (
    <div className="">
      {/* navber */}
      <Navbar />
      {/* title and search section start */}
      <div className="container my-5">
        <h1 className="home-title">Search Properties to Rent in India</h1>

        <div className="card shadow my-5" style={{ width: "100%" }}>
          <div className="card-body">
            <form className="search-form" onSubmit={onSearchHandler}>
              <div className="form-floating">
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  id="floatingInputValue"
                  placeholder="your location"
                  required
                />
                <label htmlFor="floatingSelect">Location</label>
              </div>
              <div className="form-floating">
                <select
                  name="bed"
                  className="form-select select-cus"
                  id="floatingSelectBed"
                  aria-label="Floating label select example"
                  required
                >
                  <option selected value="">
                    Select BedRoom
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <label htmlFor="floatingSelectBed">BedRoom</label>
              </div>
              <div className="form-floating">
                <select
                  name="price"
                  className="form-select"
                  id="floatingSelectPrice"
                  aria-label="Floating label select example"
                  required
                >
                  <option selected value="">
                    Select Price
                  </option>
                  <option value="1">$1-$1000</option>
                  <option value="1000">$1000-$2000</option>
                  <option value="2000">$2000-$3000</option>
                  <option value="3000">$3000-$4000</option>
                  <option value="4000">$4000-$5000</option>
                </select>
                <label htmlFor="floatingSelectPrice">Price</label>
              </div>
              <div className="form-floating">
                <select
                  name="propertyType"
                  className="form-select select-cus"
                  id="floatingSelectPropertyType"
                  aria-label="Floating label select example"
                  required
                >
                  <option selected value="">
                    Select property type
                  </option>
                  <option value="houses">Houses</option>
                  <option value="hotel">Hotels</option>
                </select>
                <label htmlFor="floatingSelectPropertyType">
                  Property Type
                </label>
              </div>
              <button type="submit" className="btn btn-primary px-4">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* title and search section end */}

      {/* property card section start */}
      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-5">
            {data.length !== 0 ? (
              <>
                {data.map((item, index) => (
                  <div className="col" key={index}>
                    <div className="card h-100 shadow">
                      <img
                        src={item.image}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h6>
                          <span className="price">${item.price}</span>/month
                        </h6>
                        <h3 className="card-title fw-bold">{item.name}</h3>
                        <p className="location">{item.location}</p>
                        <p>
                          <span className="fw-bold">Property Type:</span>{" "}
                          {item.popertyType}
                        </p>
                        <hr />
                        <div className="d-flex justify-content-evenly">
                          <p>Bed: {item.bed}</p>{" "}
                          <p>Bathroom: {item.bathroom}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="bg-danger text-white w-100 text-center rounded py-3">
                <h1>Data not found</h1>
              </div>
            )}
          </div>
        )}
      </div>

      {/* property card section end */}
    </div>
  );
};

export default Home;
