import { Music, Heart, ListMusic } from "lucide-react";

export default function GradientCover({
  gradient,
  icon,
  className = "",
  rounded = false,
}) {
  const bg =
    gradient && gradient.length >= 2
      ? `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`
      : "linear-gradient(135deg, #282828, #181818)";

  return (
    <div
      className={`flex items-center justify-center shadow-lg ${rounded ? "rounded-full" : "rounded"} ${className}`}
      style={{ background: bg }}
    >
      {icon === "heart" && (
        <Heart className="text-white w-2/5 h-2/5" fill="white" />
      )}
      {icon === "music" && <Music className="text-white/60 w-2/5 h-2/5" />}
      {icon === "list" && <ListMusic className="text-white/60 w-2/5 h-2/5" />}
    </div>
  );
}
