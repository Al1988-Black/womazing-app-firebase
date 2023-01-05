import React from "react";
import MainNewSection from "../components/ui/sections/main/mainNewSection";
import MainSkillSection from "../components/ui/sections/mainSkillSection";
import SliderOffer from "../components/ui/sections/sliders/sliderOffer";
import SliderTeams from "../components/ui/sections/sliders/sliderTeams";

const MainPage = () => {
    return (
        <main>
            <SliderOffer />
            <MainNewSection />
            <MainSkillSection />
            <SliderTeams />
        </main>
    );
};

export default MainPage;
