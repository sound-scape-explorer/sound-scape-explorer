export function useScreenCheck() {
  const isPointInPolygon = (
    point: [number, number],
    polygon: [number, number][],
  ): boolean => {
    const x = point[0];
    const y = point[1];

    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      if (inside) {
        break;
      }

      const xi = polygon[i][0];
      const yi = polygon[i][1];
      const xj = polygon[j][0];
      const yj = polygon[j][1];

      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (intersect) {
        inside = true;
      }
    }

    return inside;
  };

  return {
    isPointInPolygon: isPointInPolygon,
  };
}
