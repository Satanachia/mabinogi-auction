import { AuctionItem } from "../services/mabinogiApi";

interface ItemOptionsPaneProps {
  item: AuctionItem;
}

export default function ItemOptionsPane({ item }: ItemOptionsPaneProps) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">{item.item_display_name}</h2>
      <p>{item.auction_price_per_unit.toLocaleString()} Gold</p>
      <p>만료 시각: {new Date(item.date_auction_expire).toLocaleString()}</p>

      {item.item_option && item.item_option.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold text-sm mb-1">옵션:</h3>
          <ul className="text-xs">
            {item.item_option.map((opt, idx) => (
              <li key={idx}>
                <strong>{opt.option_type}</strong>
                {opt.option_sub_type ? ` (${opt.option_sub_type})` : ""}:{" "}
                {opt.option_desc
                  ? opt.option_desc
                  : `${opt.option_value}${
                      opt.option_value2 ? " ~ " + opt.option_value2 : ""
                    }`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};