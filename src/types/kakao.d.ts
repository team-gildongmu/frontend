import type { kakao } from "./kakao";

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

    interface MapOptions {
      center: LatLng;
      level?: number;
    }

    class Map {
      constructor(container: HTMLElement, options: MapOptions);
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
    }

    class CustomOverlay {
      constructor(options: CustomOverlayOptions);
      setMap(map: Map | null): void;
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
