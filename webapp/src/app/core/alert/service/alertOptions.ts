import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface AlertOptionsI {
    title: string;
    message: string;
    icon: IconDefinition | false;
    iconColor: string;
    bgIconColor: string;
    tittleStyle: string;
    messageStyle: string;
    showCloseButton: boolean;
    closeButtonText: string;
    closeButtonStyle: string;
    cancelOnClose: boolean;
    showConfirmButton: boolean;
    confirmButtonText: string;
    confirmButtonStyle: string;
}
