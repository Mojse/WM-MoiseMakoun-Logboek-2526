<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Concert</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Concert</ion-title>
				</ion-toolbar>
			</ion-header>

			<!-- We zorgen er hier voor dat de PR_ID getoond wordt 'on hover' -->
			<!-- Kan je de product categorie id tonen wanneer over de categorienaam wordt 'gehoverd' ?-->
			<ion-list>
				<ion-item>{{concertData.artist}}</ion-item>
                <ion-item>{{concertData.date}}</ion-item>
                <ion-item>{{concertData.hour}}</ion-item>
                <ion-item>{{concertData.venue}}</ion-item>
                <ion-item>{{concertData.price}}</ion-item>
			</ion-list>
            <ion-title>Bezoekers</ion-title>
            <ion-list>
				<ion-item v-for="{ id, first_name, last_name, email } in concertBezoekers" :key="id">
					<ion-item slot="start">{{ first_name }}</ion-item>
					<ion-label :title="id">{{ last_name }}</ion-label>
					<ion-item slot="end">{{ email }}</ion-item>
				</ion-item>

			</ion-list>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { ref, inject } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, onIonViewWillEnter, IonItem, IonLabel } from '@ionic/vue';

const id = localStorage.getItem('id');
const concertData = ref([]);
const concertBezoekers = ref([]);

const axios = inject('axios') // inject axios
const getProducten = () => {
	axios
		.get(`https://makoun.be/LiveCountry/api/concerten.php?id=${id}`)
		.then(response => {
			// controleer de response
			if (response.status !== 200) {
				// er is iets fout gegaan, doe iets met deze info
				console.log(response.status);
			}
			if (!response.data.data) {
				// De data die we verwachten zit niet in response.data :
				// de aangesproken API stopt zijn data in een data object (eigen code).
				// Deze data zit echter ook in het data object in response.
				// Daarom dus response.data.data
				console.log('response.data.data is not ok');
				return;
			}
			console.log(response.data);
            console.log(response.data.data.id);
            concertData.value = response.data.data;
			// We gaan eerst de lijst leeg maken, een beetje ruw, maar werkt op dit moment
		});
}

const getConcertBezoekers = () => {
	axios
		.get(`https://makoun.be/LiveCountry/api/tickets.php?concert_id=${id}`)
		.then(response => {
			// controleer de response
			if (response.status !== 200) {
				// er is iets fout gegaan, doe iets met deze info
				console.log(response.status);
			}
			if (!response.data.data) {
				// De data die we verwachten zit niet in response.data :
				// de aangesproken API stopt zijn data in een data object (eigen code).
				// Deze data zit echter ook in het data object in response.
				// Daarom dus response.data.data
				console.log('response.data.data is not ok');
				return;
			}
			console.log(response.data);
            concertBezoekers.value = response.data.data;
			// We gaan eerst de lijst leeg maken, een beetje ruw, maar werkt op dit moment
		});
}

onIonViewWillEnter(() => {
	// we halen de producten op bij het laden van dit scherm
	// er zijn strategieën mogelijk om dit meer performant te cachen
	getProducten();
    getConcertBezoekers();
});
</script>