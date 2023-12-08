import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import Promotions from "../Promotions/Promotions";
import Recommendation from "../Recommendation/Recommendation";



const Home = () => {
    return (
        <div className="h-[2250px]">
            <Banner></Banner>
            <Featured></Featured>
            <Promotions></Promotions>
            <Recommendation></Recommendation>
        </div>
    );
};

export default Home;