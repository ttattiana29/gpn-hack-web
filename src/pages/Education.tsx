import Reacr from 'react'
import Navbar from '../components/navbar/Navbar';
import Recommend from '../components/recommend/Recommend';
import Carousel from '../components/carousel/Carousel';
import Catalog from '../components/catalog/Catalog';
import Geolocation from '../components/geolocation/Geolocation'
const Education = () => {
    return (
        <div>
            <Navbar />
            {/* Education */}
            <Recommend />
            <Carousel />
            <Catalog />
            <Geolocation />
        </div>
    );
};

export default Education;