export default (cards, time) => cards.filter((card) => Date.parse(card.dateTo) < time);
