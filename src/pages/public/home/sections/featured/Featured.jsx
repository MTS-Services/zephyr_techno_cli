import React, { useEffect, useState } from "react";
import Container from "../../../../../layout/Container";
import { Link } from "react-router-dom";
import Card from "./components/Card";

const Featured = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let mounted = true;
    fetch('/data/featured.json')
      .then((res) => res.json())
      .then((json) => {
        if (mounted) setData(json);
      })
      .catch((err) => console.error('Failed to load featured.json', err));
    return () => { mounted = false };
  }, []);

  return (
    <Container>
      <div className="py-10 w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
          <div>
            <h1 className="title-custom">Featured Deals</h1>
            <p className="subtitle-custom mt-1">
              Our handpicked selection for this week.
            </p>
          </div>
          <div>
            <Link
              to="/products"
              className="text-sm hover:scale-95 cursor-pointer text-custom flex items-center justify-center"
            >
              View All Products →
            </Link>
          </div>
        </div>

        {/* cards */}
        <div className="mt-10 w-full grid grid-cols-1 min-[350px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
          {data?.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Featured;
