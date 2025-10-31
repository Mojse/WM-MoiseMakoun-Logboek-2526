<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Geolocation</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item>
                <ion-button @click="askPermission" :disabled="geoEnabled">Enable Geolocation</ion-button>
                <ion-button @click="getLocation" :disabled="geoDisabled">Haal locatie</ion-button>
            </ion-item>
            <ion-item>
                <ion-labek>lat : {( coords.latitude )} <br> lon : {( coords.longitude )} </ion-labek>
            </ion-item>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonButton } from '@ionic/vue';
import { Geolocation } from '@capacitor/geolocation'

const darkmode = ref(false);
const coords = ref({ latitude: 4, longitude: 50 });
const geoEnabled = ref(false);
const geoDisabled = ref(true);

const askPermission = async () => {
    // vraag voor de location permission
    const perm = await Geolocation.requestPermissions({ permissions: ["location"] });
    console.log("permission :");
    console.log(perm);
    if (perm.location == 'granted') {
        geoDisabled.value = false;
        geoEnabled.value = true;
    }
}

const getLocation = async () => {
    // haal de locatie op

    let coordinates = await Geolocation.getCurrentPosition(
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );

    coords.value.latitude = coordinates.coords.latitude;
    coords.value.longitude = coordinates.coords.longitude;
}

</script>
