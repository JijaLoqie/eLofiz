import { type FC, useState } from "react";

interface GradientBackgroundWidgetProps {
    spaceId: string;
}

const gradients = [
    { name: "Sunset", colors: ["#ff9a9e", "#fecfef", "#fecfef"] },
    { name: "Ocean", colors: ["#667eea", "#764ba2"] },
    { name: "Forest", colors: ["#134e5e", "#71b280"] },
    { name: "Fire", colors: ["#f12711", "#f5af19"] },
    { name: "Aurora", colors: ["#1a2a6c", "#b21f1f", "#fdbb2d"] },
    { name: "Night", colors: ["#0f0c29", "#302b63", "#24243e"] },
];

export const GradientBackgroundWidget: FC<GradientBackgroundWidgetProps> = ({ spaceId }) => {
    const [selectedGradient, setSelectedGradient] = useState(gradients[0]);

    return (
        <div className="absolute inset-0 pointer-events-none transition-all duration-1000"
            style={{
                background: `linear-gradient(135deg, ${selectedGradient.colors.join(", ")})`,
            }}
        >
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/30 backdrop-blur-md rounded-xl">
                {gradients.map((gradient) => (
                    <button
                        key={gradient.name}
                        onClick={() => setSelectedGradient(gradient)}
                        className={`w-6 h-6 rounded-full transition-all hover:scale-110 ${
                            selectedGradient.name === gradient.name ? "ring-2 ring-white" : ""
                        }`}
                        style={{ background: `linear-gradient(135deg, ${gradient.colors.join(", ")})` }}
                    />
                ))}
            </div>
        </div>
    );
};
