import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContect";
import Loader from "../components/Loader";
import axios from "axios";

function PaketAdmin() {
  //auth
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/admin");
    }
  }, []);

  //get
  const [paket, setPaket] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchPaket = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/paket`);
        setPaket(response?.data);
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    };

    fetchPaket();
  }, []);

  const removePaket = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/paket/${id}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
      if (response.status == 200) {
        if (location.pathname == "/paket") {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log("Tidak Bisa Delete Paket");
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {paket.length > 0 ? (
        <div className=" container min-h-screen bg-primary lg:pt-20 pt-24 pb-16">
          <div className="text-center flex justify-between  items-center">
            <h3 className="mr-1 mb-2 my-4 py-2 pl-2 border-l-4 border-white/50 font-semibold text-white">Paket AL Qudsi</h3>
            <Link to={"/paket/create"} className="bg-white hover:bg-white/50 py-2 px-2 text-secondary hover:text-white uppercase rounded text-xs tracking-wider ">
              Tambah Paket
            </Link>
          </div>
          <div className="grid-auto-fit-lg grid gap-2">
            {paket.map(({ _id: id, gambar, judul }) => (
              <paket key={id} className="p-4 bg-white/70 rounded-xl">
                <div className="gap-8 w-full items-center">
                  <div className=" flex justify-between items-center pb-2">
                    <h4 className="font-semibold pt-2">{judul}</h4>
                    <div className="gap-2 flex">
                      <Link to={`/paket/${id}/edit`} className=" button mt-4 bg-primary hover:bg-primary/50 px-4 py-2 text-white uppercase rounded text-xs tracking-wider">
                        Edit
                      </Link>
                      <Link onClick={() => removePaket(`${id}`)} className=" button mt-4 bg-primary hover:bg-primary/50 px-4 py-2 text-white uppercase rounded text-xs tracking-wider">
                        Delete
                      </Link>
                    </div>
                  </div>
                  <div className=" rounded-lg overflow-hidden shadow-lg">
                    <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${gambar}`} />
                  </div>
                </div>
              </paket>
            ))}
          </div>
        </div>
      ) : (
        <div className=" container min-h-screen bg-primary lg:pt-20 pt-24 pb-16">
          <div className=" md:flex md:justify-between  items-center pb-4">
            <h3 className="mr-1 mb-2 my-4 py-2 pl-2 border-l-4 border-white/50 font-semibold text-white">Paket AL Qudsi Tidak Tersedia</h3>
          </div>
        </div>
      )}
    </>
  );
}

export default PaketAdmin;
