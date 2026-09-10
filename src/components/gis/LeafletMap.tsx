import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { LandParcel, InfrastructureProject } from '../../types';

// Fix for Leaflet default marker icons in Vite/Webpack
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

interface LeafletMapProps {
  parcels: LandParcel[];
  projects: InfrastructureProject[];
  selectedParcelId?: string;
  onSelectParcel: (parcel: LandParcel) => void;
  showBufferZone?: boolean;
  showCadastralGrid?: boolean;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  parcels,
  projects,
  selectedParcelId,
  onSelectParcel,
  showBufferZone = true,
  showCadastralGrid = true
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize map centered on India (Vadodara/Gujarat corridor focus)
      const map = L.map(mapContainerRef.current, {
        center: [21.5, 73.5],
        zoom: 7,
        zoomControl: false
      });

      // Add Zoom control at top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Add dark matter tile layer for high-tech geospatial command center aesthetic
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> | Survey of India NGI',
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      mapInstanceRef.current = map;
      layerGroupRef.current = L.layerGroup().addTo(map);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map layers whenever parcels or selection changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // 1. Draw National Project Markers
    projects.forEach(project => {
      const projectIcon = L.divIcon({
        className: 'custom-project-pin',
        html: `<div style="background-color: #0284c7; color: white; border: 2px solid white; border-radius: 9999px; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.5);">
          ${project.ministry === 'MoRTH' ? '🛣️' : project.ministry === 'Indian Railways' ? '🚆' : '💧'}
        </div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      const marker = L.marker(project.coordinates, { icon: projectIcon });
      marker.bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; min-width: 200px; color: #1e293b;">
          <b style="font-size: 13px; color: #0369a1;">${project.name}</b><br/>
          <span style="color: #64748b;">${project.corridor}</span>
          <div style="margin-top: 6px; padding: 4px 6px; background: #f1f5f9; border-radius: 4px;">
            <b>Acquisition:</b> ${project.acquisitionPercentage}% (${project.landAcquiredHa} / ${project.totalLandRequiredHa} Ha)<br/>
            <b>Disbursed:</b> ₹${project.compensationDisbursedCr} Cr<br/>
            <b>Active Disputes:</b> ${project.activeDisputes}
          </div>
        </div>
      `);
      layerGroup.addLayer(marker);
    });

    // 2. Draw Land Parcels Polygons
    if (showCadastralGrid) {
      parcels.forEach(parcel => {
        const isSelected = parcel.id === selectedParcelId;

        // Color coding by status
        let fillColor = '#3b82f6'; // blue
        let strokeColor = '#2563eb';

        if (['Compensation_Paid', 'Possession_Taken', 'Mutated_To_Govt'].includes(parcel.status)) {
          fillColor = '#10b981'; // green
          strokeColor = '#059669';
        } else if (parcel.status === 'In_Dispute') {
          fillColor = '#ef4444'; // red
          strokeColor = '#dc2626';
        } else if (['Sec_11_Awarded', 'Valuation_Done'].includes(parcel.status)) {
          fillColor = '#0ea5e9'; // sky
          strokeColor = '#0284c7';
        } else {
          fillColor = '#f59e0b'; // amber
          strokeColor = '#d97706';
        }

        const polygon = L.polygon(parcel.coordinates, {
          color: isSelected ? '#ffffff' : strokeColor,
          weight: isSelected ? 3 : 1.5,
          fillColor: fillColor,
          fillOpacity: isSelected ? 0.65 : 0.45,
          dashArray: parcel.status === 'In_Dispute' ? '4, 4' : undefined
        });

        // Popup with survey details
        polygon.bindPopup(`
          <div style="font-family: sans-serif; font-size: 12px; min-width: 220px; color: #0f172a;">
            <div style="font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 4px;">
              Survey #${parcel.surveyNumber} (${parcel.village})
            </div>
            <div style="color: #475569; line-height: 1.5;">
              <b>Parcel ID:</b> ${parcel.parcelCode}<br/>
              <b>Owner:</b> ${parcel.landOwnerName}<br/>
              <b>Area:</b> ${parcel.areaAcres} Acres (${parcel.landCategory})<br/>
              <b>Compensation:</b> ₹${(parcel.totalCompensationRupees / 10000000).toFixed(2)} Cr<br/>
              <b>Status:</b> <span style="font-weight: 600; color: ${strokeColor}">${parcel.status.replace(/_/g, ' ')}</span>
            </div>
          </div>
        `);

        polygon.on('click', () => {
          onSelectParcel(parcel);
        });

        layerGroup.addLayer(polygon);

        // Center marker with survey number label
        const labelMarker = L.circleMarker(parcel.centerCoordinate, {
          radius: 3,
          color: '#ffffff',
          fillColor: strokeColor,
          fillOpacity: 1,
          weight: 1
        });
        layerGroup.addLayer(labelMarker);
      });
    }

    // 3. Highlight selected parcel if any and fly to it
    if (selectedParcelId) {
      const selected = parcels.find(p => p.id === selectedParcelId);
      if (selected) {
        map.flyTo(selected.centerCoordinate, 14, { duration: 1.2 });
      }
    }
  }, [parcels, projects, selectedParcelId, showCadastralGrid, onSelectParcel]);

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
      <div ref={mapContainerRef} className="w-full h-full min-h-[420px]" />

      {/* Map Overlay Controls / Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-slate-900/90 backdrop-blur-md p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300 shadow-xl pointer-events-auto">
        <div className="font-semibold text-slate-100 text-[11px] uppercase tracking-wider mb-2 flex items-center justify-between gap-4">
          <span>Cadastral Status</span>
          <span className="text-[10px] text-slate-400 font-mono">EPSG:4326</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block"></span>
            <span>Possession / Paid</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-sky-500 inline-block"></span>
            <span>Award / Valuation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-500 inline-block"></span>
            <span>Sec 4 / Survey</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-rose-500 inline-block"></span>
            <span>Litigation / Dispute</span>
          </div>
        </div>
      </div>
    </div>
  );
};
