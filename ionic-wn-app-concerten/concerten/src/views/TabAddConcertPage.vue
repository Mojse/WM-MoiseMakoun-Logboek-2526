<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Voeg een product toe</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Add a concert</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-grid>
				<ion-row>
					<ion-col class="ion-text-center">Which concert do you want to add?</ion-col>
				</ion-row>

				<ion-row>
					<ion-col>
						<ion-item>
							<ion-input label="Concert" label-placement="stacked" placeholder="Artist"
								v-model="concertArtist" required="true" @ion-blur="logConcert()"></ion-input>
						</ion-item>
                        <ion-item>
                            <ion-input label="Date" label-placement="stacked" placeholder="Date"
                            v-model="concertDate" required="true" @ion-blur="logConcert()" type="date"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input label="Hour" label-placement="stacked" placeholder="Hour"
                            v-model="concertHour" required="true" type="time"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input label="Venue" label-placement="stacked" placeholder="Venue"
                            v-model="concertVenue" required="true" type="text"></ion-input>
                        </ion-item>
						<ion-item>
							<ion-input label="Price" label-placement="stacked" placeholder="10.00" v-model="concertPrice"
								type="number" required="true" @ion-blur="logProduct()"></ion-input>
						</ion-item>
					</ion-col>
				</ion-row>
				<ion-row>
					<ion-col>
						<ion-button id="open-toast" expand="block" @click="verzendProduct()">Confirm</ion-button>
						<ion-toast trigger="open-toast" message="Concert has successfully been added!" duration="5000"></ion-toast>
					</ion-col>
				</ion-row>
			</ion-grid>

		</ion-content>
	</ion-page>
</template>

<script setup>
import { ref, inject } from 'vue';
const axios = inject('axios') // inject axios
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, IonButton, IonToast } from '@ionic/vue';

const concertArtist = ref('');
const concertPrice = ref(0.00);
const concertVenue = ref('');
const concertDate = ref('')
const concertHour = ref('');

const isEdit = localStorage.getItem('edit');
const lsId = localStorage.getItem('id');

if (isEdit == 'true') {
	axios
		.get(`https://makoun.be/LiveCountry/api/concerten.php?id=${lsId}`)
		.then(response => {
			if (response.status !== 200) {
				console.log(response.status);
			}
			if (!response.data.data) {
				console.log('response.data.data is not ok');
				return;
			}
			console.log(response.data);
            concertArtist.value = response.data.data.artist;
			concertPrice.value = response.data.data.price;
			concertVenue.value = response.data.data.venue;
			concertDate.value = response.data.data.date;
			concertHour.value = response.data.data.hour;
		});
}

const postConcert = () => {
	axios
		.post('https://makoun.be/LiveCountry/api/concerten.php/', {
			artist: concertArtist.value,
			date: concertDate.value,
			hour: concertHour.value,
            venue: concertVenue.value,
            price: concertPrice.value
		})
		.then(response => {
			// controleer de response
			console.log(response);
			if (response.status !== 200) {
				// TODO: er is iets fout gegaan, doe iets met deze info
				// mogelijk met https://ionicframework.com/docs/api/toast
				console.log(response.status);
			} else {
				// maak de velden leeg
				concertArtist.value = '';
				concertDate.value = '';
				concertHour.value = '';
                concertPrice.value = 0;
                concertVenue.value = '';
				//TODO: Bevestig dat het product is toegevoegd
				// mogelijk met https://ionicframework.com/docs/api/toast
			}
		});
}


const putConcert = () => {
	axios
		.put(`https://makoun.be/LiveCountry/api/concerten.php?id=${lsId}`, {
			id: lsId,
			artist: concertArtist.value,
			date: concertDate.value,
			hour: concertHour.value,
            venue: concertVenue.value,
            price: concertPrice.value
		})
		.then(response => {
			// controleer de response
			console.log(response);
			if (response.status !== 200) {
				console.log(response.status);
			} else {
				// maak de velden leeg
				concertArtist.value = '';
				concertDate.value = '';
				concertHour.value = '';
                concertPrice.value = 0;
                concertVenue.value = '';
				//TODO: Bevestig dat het product is toegevoegd
				// mogelijk met https://ionicframework.com/docs/api/toast
			}
		});
}

const logConcert = () => {
	console.log(`naam: ${concertArtist.value}, date: ${concertDate.value}, price: ${concertPrice.value}`);
};

const verzendProduct = () => {
	// TODO: dit verder uitwerken en effectief het product verzenden
	logConcert();
	if (isEdit == 'true') {
		putConcert();
	}
	else{
		postConcert();
	}
};

</script>