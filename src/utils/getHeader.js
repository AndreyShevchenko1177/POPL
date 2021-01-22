export function getHeader(header) {
  let result = "";

  switch (header) {
    case "/":
      result = "overview";
      break;
    case "/popls":
      result = "popls";
      break;
    case "/campaigns":
      result = "campaigns";
      break;
    case "/analytics":
    case "/analytics/real-time":
    case "/analytics/crm-integrations":
      result = "analytics";
      break;
    case "/setting":
      result = "setting";
      break;
    default:
      result = "";
  }

  return result;
}
