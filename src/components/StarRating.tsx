import { StarIcon } from "./Icons";

export function StarRating({
  rating,
  size = 14,
  className = "",
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center text-gold ${className}`} aria-label={`Rating ${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const filled = rating >= i + 1;
        const half = !filled && rating > i;
        return (
          <StarIcon key={i} width={size} height={size} filled={filled} half={half} strokeWidth={filled || half ? 0 : 1.4} />
        );
      })}
    </div>
  );
}
