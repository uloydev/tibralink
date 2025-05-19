<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";

	let { form }: { form: ActionData } = $props();
</script>

<div class="h-screen w-screen flex items-center justify-center bg-gray-100">
	<div
		class="flex flex-col justify-center px-6 py-12 lg:px-8 bg-white rounded-lg shadow-lg"
	>
		<div class="sm:mx-auto sm:w-full sm:max-w-md">
			<h2
				class=" text-center text-2xl/9 font-bold tracking-tight text-gray-900"
			>
				Sign in to your account
			</h2>
		</div>

		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<p class="text-red-500">{form?.message ?? ""}</p>
			<form class="space-y-6" method="post" action="?/login" use:enhance>
				<div>
					<label
						for="username"
						class="block text-sm/6 font-medium text-gray-900"
						>Username</label
					>
					<div class="mt-2">
						<input
							type="text"
							name="username"
							id="username"
							required
							class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
						/>
					</div>
				</div>

				<div>
					<div class="flex items-center justify-between">
						<label
							for="password"
							class="block text-sm/6 font-medium text-gray-900"
							>Password</label
						>
					</div>
					<div class="mt-2">
						<input
							type="password"
							name="password"
							id="password"
							required
							class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
						/>
					</div>
				</div>

				<div>
					<button
						type="submit"
						class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Sign in
					</button>
				</div>
				<!-- <div>
					<button
						formaction="?/register"
						class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						register
					</button>
				</div> -->
			</form>
		</div>
	</div>
</div>
