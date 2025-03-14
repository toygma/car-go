import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { MapPin, MapPinned } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface NominatimResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

interface PlacesAutoCompleteProps {
  setPosition?: (position: [number, number]) => void;
  onLocationChanged: (currentValue: string) => void;
  value: string;
  prevLocation?: string;
}

const PlacesAutoComplete = ({
  setPosition,
  onLocationChanged,
  value,
  prevLocation,
}: PlacesAutoCompleteProps) => {
  const [open, setOpen] = useState(false);
  const [locationValue, setLocationValue] = useState(value || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchLocation = async (query: string) => {
    if (query) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await response.json();
      setResults(data);
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      searchLocation(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (prevLocation) {
      setLocationValue(prevLocation);
    }
  }, [prevLocation]);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            variant="outline"
            className="w-full flex justify-between"
          >
            <MapPinned size={24} className="h-4 w-4 shrink-0 opacity-50 mr-2" />
            <span className="flex-grow truncate text-left">
              {locationValue ? locationValue : "Select Location..."}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] p-0">
          <Command>
            <CommandInput
              placeholder="Search Location..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {results.map((result: NominatimResult) => (
                  <CommandItem
                    key={result.place_id}
                    value={result.display_name}
                    onSelect={(currentValue: any) => {
                      setOpen(false);
                      setLocationValue(currentValue);
                      if (setPosition) {
                        setPosition([
                          parseFloat(result.lat),
                          parseFloat(result.lon),
                        ]);
                      }
                      onLocationChanged(currentValue);
                    }}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center flex-grow">
                        <MapPin className="h-4 w-4 mr-2" />
                        <div className="flex-grow">{result.display_name}</div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

const LocationSearch = ({
  onLocationChanged,
  value,
  prevLocation,
}: PlacesAutoCompleteProps) => {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);

  return (
    <div style={{ height: "40vh", width: "100%" }}>
      <PlacesAutoComplete
        setPosition={setPosition}
        onLocationChanged={onLocationChanged}
        value={value}
        prevLocation={prevLocation}
      />
      <MapContainer
        center={position}
        zoom={0}
        style={{ height: "35vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationSearch;
