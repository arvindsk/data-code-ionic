import { NgModule } from '@angular/core';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

/**
 * STEPS for Icon Use:
 * 1) Determine which package the font-awesome icon lives in (free versions are fas or far)
 * 2) Import specific icon
 * 3) Add icon to "library" for use throughout the application
 * 4) Reference icon with <fa-icon icon="icon-name" size="lg"></fa-icon>
 *
 * Note:  This defaults to "fas" icons.  To use an far icon you need to make your html element like: <fa-icon [icon]="['far', 'envelope']"></fa-icon>
 */

/* "fas" - solid */
import {
  faShip,
  faFilter,
  faChevronDown,
  faChevronUp,
  faCog,
  faSyncAlt,
  faInfoCircle,
  faTasks,
  faCube,
  faFlag,
  faGlobe,
  faSignOutAlt,
  faChevronRight,
  faSort,
  faThList,
  faSearch,
  faCheck,
  faTimes,
  faDownload,
  faUsers,
  faChevronLeft,
  faTimesCircle,
  faExclamation,
  faExclamationCircle,
  faExclamationTriangle,
  faAngleDown,
  faAngleRight,
  faAngleLeft,
  faLock,
  faQuestion,
  faCaretDown,
  faWrench,
  faTruck,
  faPaperclip,
  faCamera,
  faFile,
  faExternalLinkAlt,
  faBan,
  faPlus,
  faBell as faBellSolid,
  faStar as faStarSolid,
  faEllipsisH,
  faGripLines,
  faPencilAlt,
  faStopwatch,
  faShareAlt,
  faFileExport,
  faUserCircle,
  faListAlt,
  faFileAlt,
  faIdBadge,
  faEnvelope,
  faEnvelopeOpen,
  faLifeRing,
  faQuestionCircle,
  faBell, faBellSlash, faStar, faTrashAlt, faCalendarAlt, faClock,
} from '@fortawesome/free-solid-svg-icons';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';

/* "far" - regular */


/* "fab" - free brands regular */


// Add an icon to the library for convenient access in other components

@NgModule({
    imports: [FontAwesomeModule],
    declarations: [],
    exports: [FontAwesomeModule],
})
export class FontAwesome {
    constructor(library: FaIconLibrary) {
        // 3-15-19 - danp - don't turn on dom.watch as it slows down the UI
        // dom.watch();

        library.addIcons(
            faShip,
            faFilter,
            faChevronDown,
            faChevronUp,
            faCog,
            faSyncAlt,
            faAngleDown,
            faFlag,
            faInfoCircle,
            faTasks,
            faUserCircle,
            faListAlt,
            faFileAlt,
            faIdBadge,
            faGlobe,
            faSignOutAlt,
            faChevronRight,
            faCube,
            faSort,
            faThList,
            faSearch,
            faCheck,
            faTimes,
            faDownload,
            faUsers,
            faChevronLeft,
            faTimesCircle,
            faExclamation,
            faExclamationCircle,
            faExclamationTriangle,
            faAngleRight,
            faAngleLeft,
            faEnvelope,
            faEnvelopeOpen,
            faLock,
            faLifeRing,
            faQuestion,
            faCaretDown,
            faWrench,
            faTruck,
            faPaperclip,
            faCamera,
            faFile,
            faQuestionCircle,
            faExternalLinkAlt,
            faBan,
            faBell,
            faBellSlash,
            faBellSolid,
            faClock,
            faPlus,
            faStar,
            faStarSolid,
            faTrashAlt,
            faEllipsisH,
            faCalendarAlt,
            faPencilAlt,
            faGripLines,
            faStopwatch,
            faShareAlt,
            faFileExport,
        );
    }
}
