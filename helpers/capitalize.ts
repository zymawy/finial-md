export default function capitalizeString(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



export function strLimit(string: string): string {
	return string.length > 10 ? string.substring(0,10) + '...' : string;
}
