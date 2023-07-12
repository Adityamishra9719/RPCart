import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from './ProductCard';
import MetaData from "../layout/MetaData"
import { getProduct, clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader"
import { useAlert } from "react-alert"


// //temporary product array 
// const product={
//     name:"Blue Tshirt",
//     images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
//     price:"$30",
//     _id:"aditya"
// };

const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, alert, error]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="RPcart" />
                    <div className="banner">
                        <p>Welcome to RPCarts!</p>
                        <h1>Find Amazing Products Below</h1>

                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        {/* <Product product={product}/> */}

                        {products && products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Home;