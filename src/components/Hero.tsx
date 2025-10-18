import Logo from "./Logo";
import Button from "./Button";
import VideoPlayer from "./VideoPlayer";

function Hero() {
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-4 grid-rows-9 gap-4 md:mx-[100px] md:mt-[50px]">
        <div className="row-span-2 row-start-1 flex items-center justify-center mr-[10px] ...">
            <Logo />
        </div>
        <div className="md:col-span-3 row-span-2 row-start-3 md:row-start-1 flex flex-col ...">
            <h1 className="flex-span-1 text-6xl font-bold text-white mb-6">
                Clairity: Smart Restroom Air Quality Monitoring System using Gradient Boosting
            </h1>
            <p>
                An AI-powered application designed to monitor and forecast air quality levels in a public restrooms.  
                Apart from that it also provides real-time alerts and health recommendations to ensure a safe and comfortable environment for users.
            </p>
        </div>
        <div className="md:col-span-1 row-start-5 md:row-start-3 flex flex-row items-center space-x-[20px] ...">
            <Button
                label="Download APK"
                icon="↓"
                gradientFrom="#34593e"
                gradientTo="#0b1a2b"
            />
            <Button
                label="User Manual"
                icon="📄"
                gradientFrom="#294b33"
                gradientTo="#1e3836"
            />
        </div>
        <div className="md:col-span-4 row-span-6 row-start-5 md:row-start-4 flex flex-col items-center ...">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6"> Applicaton Demo </h1>
            <div className="flex items-center justify-center h-[250px] md:h-[450px]">
                <VideoPlayer
                    src="/videos/sample.mp4"
                    poster="/images/thumbnail.jpg"
                    className="h-full aspect-[16/9] aspect-video"
                />
            </div>
        </div>
    </div>
  );
}

export default Hero;
