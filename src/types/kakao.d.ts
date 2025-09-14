declare global {
  interface Window {
    kakao: typeof kakao;
    selectLocation?: (locationId: number) => void;
  }
}

declare namespace kakao {
  namespace maps {
    class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
    }

    class LatLngBounds {
      constructor();
      extend(latlng: LatLng): void;
      isEmpty(): boolean;
    }

    interface MapOptions {
      center: LatLng;
      level?: number;
    }

    class Map {
      constructor(container: HTMLElement, options: MapOptions);
      setCenter(latlng: LatLng): void;
      setLevel(level: number): void;
      getCenter(): LatLng;
      getLevel(): number;
      setBounds(
        bounds: LatLngBounds,
        paddingTop?: number,
        paddingRight?: number,
        paddingBottom?: number,
        paddingLeft?: number
      ): void;
    }

    interface MarkerOptions {
      position: LatLng;
      map?: Map;
    }

    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
    }

    interface CustomOverlayOptions {
      content: string | HTMLElement;
      position: LatLng;
      yAnchor?: number;
      zIndex?: number;
    }

    class CustomOverlay {
      constructor(options: CustomOverlayOptions);
      setMap(map: Map | null): void;
      setPosition(latlng: LatLng): void;
      setContent(content: string | HTMLElement): void;
      setYAnchor(yAnchor: number): void;
      setZIndex(zIndex: number): void;
    }

    interface PolylineOptions {
      path: LatLng[];
      strokeWeight?: number;
      strokeColor?: string;
      strokeOpacity?: number;
      strokeStyle?: string;
    }

    class Polyline {
      constructor(options: PolylineOptions);
      setMap(map: Map | null): void;
      setPath(path: LatLng[]): void;
      setStrokeColor(color: string): void;
      setStrokeWeight(weight: number): void;
      setStrokeOpacity(opacity: number): void;
    }

    namespace event {
      function addListener(
        target: Map | Marker | CustomOverlay,
        type: string,
        callback: () => void
      ): void;
      function trigger(
        target: Map | Marker | CustomOverlay,
        type: string
      ): void;
    }

    function load(callback: () => void): void;
  }
}
