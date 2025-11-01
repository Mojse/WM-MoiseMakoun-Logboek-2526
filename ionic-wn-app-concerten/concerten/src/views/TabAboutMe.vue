<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>About me</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">About me</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-label>Gemaakt door Moïse Makoun</ion-label>

		</ion-content>
	</ion-page>
</template>

<script setup>

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel } from '@ionic/vue';

</script>