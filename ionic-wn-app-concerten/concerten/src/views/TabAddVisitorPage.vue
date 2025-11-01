<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Voeg een bezoeker toe</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Add a visitor</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-grid>
				<ion-row>
					<ion-col class="ion-text-center">Which visitor do you want to add?</ion-col>
				</ion-row>

				<ion-row>
					<ion-col>
						<ion-item>
							<ion-input label="First Name" label-placement="stacked" placeholder="John"
								v-model="firstName" required="true" @ion-blur="logVisitor()"></ion-input>
						</ion-item>
                        <ion-item>
                            <ion-input label="Last Name" label-placement="stacked" placeholder="Doe"
                            v-model="lastName" required="true" @ion-blur="logvisitor()"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input label="Birth Date" label-placement="stacked" placeholder="Birth Date"
                            v-model="birthDate" required="true" type="date"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input label="Email" label-placement="stacked" placeholder="Email"
                            v-model="email" required="true" type="email"></ion-input>
                        </ion-item>
					</ion-col>
				</ion-row>
				<ion-row>
					<ion-col>
						<ion-button id="open-toast" expand="block" @click="verzendProduct()">Confirm</ion-button>
						<ion-toast trigger="open-toast" message="Database has been updated!!" duration="5000"></ion-toast>
					</ion-col>
				</ion-row>
			</ion-grid>

		</ion-content>
	</ion-page>
</template>

<script setup>

const axios = inject('axios') // inject axios
import { ref, inject } from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, IonButton, IonToast } from '@ionic/vue';

const firstName = ref('');
const lastName = ref('');
const birthDate = ref('');
const email = ref('')

const isEdit = localStorage.getItem('edit');
const lsId = localStorage.getItem('id');

if (isEdit == 'true') {
	axios
		.get(`https://makoun.be/LiveCountry/api/bezoekers.php?id=${lsId}`)
		.then(response => {
			if (response.status !== 200) {
				console.log(response.status);
			}
			if (!response.data.data) {
				console.log('response.data.data is not ok');
				return;
			}
			console.log(response.data);
            firstName.value = response.data.data.first_name;
			lastName.value = response.data.data.last_name;
			birthDate.value = response.data.data.birth_date;
			email.value = response.data.data.email;
		});
}

const postVisitor = () => {
	axios
		.post('https://makoun.be/LiveCountry/api/bezoekers.php/', {
			first_name: firstName.value,
			last_name: lastName.value,
			birth_date: birthDate.value,
            email: email.value,
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
				firstName.value = '';
				lastName.value = '';
				birthDate.value = '';
                email.value = '';
				//TODO: Bevestig dat het product is toegevoegd
				// mogelijk met https://ionicframework.com/docs/api/toast
			}
		});
}

const putVisitor = () => {
	axios
		.put(`https://makoun.be/LiveCountry/api/bezoekers.php?id=${lsId}`, {
			id: lsId,
			first_name: firstName.value,
			last_name: lastName.value,
			birth_date: birthDate.value,
            email: email.value,
		})
		.then(response => {
			// controleer de response
			console.log(response);
			if (response.status !== 200) {
				console.log(response.status);
			} else {
				// maak de velden leeg
				firstName.value = '';
				lastName.value = '';
				birthDate.value = '';
                email.value = '';
				//TODO: Bevestig dat het product is toegevoegd
				// mogelijk met https://ionicframework.com/docs/api/toast
			}
		});
}

const logVisitor = () => {
	console.log(`first name: ${firstName.value}, last name: ${lastName.value}`);
};

const verzendProduct = () => {
	// TODO: dit verder uitwerken en effectief het product verzenden
	logVisitor();
	if (isEdit == 'true') {
		putVisitor();
	} else {
		postVisitor();
	}
	localStorage.setItem('edit', false);
	window.location.href = 'home';
};

</script>