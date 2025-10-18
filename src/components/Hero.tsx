import Logo from "./Logo";
import Button from "./Button";
import VideoPlayer from "./VideoPlayer";

function Hero() {
  return (
    <div className="grid w-full min-w-full grid-cols-1 md:grid-cols-4 gap-4 px-4 sm:px-8 lg:px-16 xl:px-24 md:mt-[50px] overflow-x-hidden">
        
        <div className="col-span-1 md:col-span-4">
            {/* Logo repositioned inside the title section on medium screens */}
            <div className="flex justify-center mb-6">
                <Logo />
            </div>

            <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
    Clairity: Smart Restroom Air Quality Monitoring System using Gradient Boosting
</h1>
            <p className="text-center max-w-4xl mx-auto">
                An AI-powered application designed to monitor and forecast air quality levels in a public restrooms.  
                Apart from that it also provides real-time alerts and health recommendations to ensure a safe and comfortable environment for users.
            </p>
        </div>

        <div className="md:col-span-4 row-span-6 row-start-2 flex flex-col items-center">
            <div className="flex flex-col sm:flex-row gap-5 py-10 w-full justify-center">
                <Button
                    label="Download APK"
                    icon="↓"
                    gradientFrom="#34593e"
                    gradientTo="#0b1a2b"
                        onClick={() => {
                        const link = document.createElement('a');
                        link.href = '/downloads/clairity.apk';
                        link.download = 'clairity.apk'; 
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        }}
                />
                <Button
                    label="Github"
                    icon="🔗"
                    gradientFrom="#294b33"
                    gradientTo="#1e3836"
                    href="https://github.com/AKSM-TFT/thesis-web.git" 
                />
                <Button
                    label="User Manual"
                    icon="📄"
                    gradientFrom="#294b33"
                    gradientTo="#1e3836"
                    href='/docs/clairity_user_manual.pdf'
                />
            </div>
        </div>
        
        <div className="col-span-1 md:col-span-4 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-6">Application Demo</h2>
            <div className="flex flex-col items-center justify-center max-w-4xl mx-auto h-[400px] md:h-[450px] mb-25 mt-10">
                <VideoPlayer
                    src="/videos/clairity-video.mp4"
                    poster="/images/thumbnail.jpg"
                    className="h-full w-full aspect-[16/9] aspect-video"
                />
            </div>
        </div>
    </div>
  );
}

export default Hero;