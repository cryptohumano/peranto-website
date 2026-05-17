import type { ProjectScreenshot } from './screenshot-types';
import lumoAdminTrips from '../assets/lumo/lumo-admin-trips.png';
import lumoDriverApproval from '../assets/lumo/lumo-driver-approval.png';
import lumoDriverTrip from '../assets/lumo/lumo-driver-trip.png';
import lumoPinStart from '../assets/lumo/lumo-pin-start.png';
import lumoRequest from '../assets/lumo/lumo-request.png';
import lumoTripMap from '../assets/lumo/lumo-trip-map.png';

export const lumoScreenshots: ProjectScreenshot[] = [
  {
    id: 'map',
    src: lumoTripMap,
    captionKey: 'research.projects.lumo.shot.map',
    featured: true,
  },
  {
    id: 'request',
    src: lumoRequest,
    captionKey: 'research.projects.lumo.shot.request',
  },
  {
    id: 'admin',
    src: lumoAdminTrips,
    captionKey: 'research.projects.lumo.shot.admin',
  },
  {
    id: 'onboarding',
    src: lumoDriverApproval,
    captionKey: 'research.projects.lumo.shot.onboarding',
  },
  {
    id: 'driver',
    src: lumoDriverTrip,
    captionKey: 'research.projects.lumo.shot.driver',
  },
  {
    id: 'verify',
    src: lumoPinStart,
    captionKey: 'research.projects.lumo.shot.verify',
  },
];
