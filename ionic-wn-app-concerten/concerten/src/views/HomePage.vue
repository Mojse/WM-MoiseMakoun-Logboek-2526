<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Concerts</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Tab 2</ion-title>
				</ion-toolbar>
			</ion-header>

			<!-- We zorgen er hier voor dat de PR_ID getoond wordt 'on hover' -->
			<!-- Kan je de product categorie id tonen wanneer over de categorienaam wordt 'gehoverd' ?-->
			<ion-list>
				<ion-item v-for="{ id, artist, date, price } in concerten" :key="id">
					<ion-item slot="start">€{{ price }}</ion-item>
					<ion-label :title="id">{{ artist }}</ion-label>
					<ion-item slot="end">{{ date }}</ion-item>
					<ion-button id="open-toast" expand="block" @click="goToDetails(id)">Details</ion-button>
					<ion-button id="open-toast" expand="block" @click="goToEdit(id)">Edit</ion-button>
					<ion-button id="open-toast" expand="block" @click="deleteSelected(id, 1)">Delete</ion-button>
				</ion-item>

			</ion-list>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { ref, inject } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonItem, onIonViewWillEnter, IonButton } from '@ionic/vue';

const concerten = ref([]);

const axios = inject('axios') // inject axios
const getProducten = () => {
	axios
		.get('https://makoun.be/LiveCountry/api/concerten.php')
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
			// We gaan eerst de lijst leeg maken, een beetje ruw, maar werkt op dit moment
			concerten.value = [];
			for (let i = 0, end = response.data.data.length; i < end; i++) {
				// response.data.data is een array, we lopen er door en stoppen de gegevens van iedere record in producten.value (ref!)
				concerten.value.push(response.data.data[i]);
			}
			console.log("Concerten :");
			console.log(concerten.value);
		});
}
onIonViewWillEnter(() => {
	// we halen de producten op bij het laden van dit scherm
	// er zijn strategieën mogelijk om dit meer performant te cachen
	getProducten();
});

function goToDetails(id){
	console.log(id);
	localStorage.setItem('id', id);
}

function deleteSelected(id, type){
	console.log(id);
	let url = '';
		if (type == 1) {
			url = `https://makoun.be/LiveCountry/api/concerten.php?id=${id}`;
		} else {
			url = `https://makoun.be/LiveCountry/api/bezoekers.php?id=${id}`;
		}
	axios
		.delete(url)
		.then(response => {
			if (response.status !== 200) {
				console.log(response.status);
			}
			if (!response.data.data) {
				console.log('response.data.data is not ok');
				return;
			}
		});
}

function goToEdit(id){
	console.log(id);
	localStorage.setItem('id', id);
	localStorage.setItem('edit', 'true');
}

</script>