<script setup lang="ts">
import QRCode, {type QRCodeToDataURLOptions} from 'qrcode'

const textInput = ref<string>('')
const qrResult = ref<string>('')

const opts: QRCodeToDataURLOptions = {
  errorCorrectionLevel: 'H',
}

async function generate() {
  try {
    qrResult.value = await QRCode.toString(textInput.value, {
      type: 'svg'
    })
  } catch (err) {
    console.error(err)
  }
}

function downloadSVG() {
  if (!qrResult.value) {
    console.error("No QR code available for download.")
    return;
  }

  const blob = new Blob([qrResult.value], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'qr-code.svg';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
</script>

<template>
  <main class="flex flex-col max-w-[720px] min-h-screen mx-auto">

    <UCard class="mt-8">
      <template #header>
        <div class="text-center text-[clamp(1rem,4vw+1rem,3rem)] font-['Barrio',sans-serif]">QR Code Generator</div>
      </template>

      <div class="flex flex-col gap-6">
        <section class="px-12">
          <USkeleton v-if="!qrResult" style="width:100%;aspect-ratio: 1/1" />
          <div v-else class="w-full h-full rounded-md overflow-hidden" v-html="qrResult"></div>
        </section>

        <section class="">
          <UTextarea placeholder="Input..." :rows="1" autoresize size="xs" color="teal" v-model="textInput" />
        </section>
      </div>

      <template #footer>
        <div class="flex justify-between gap-2">
          <UButton
              icon="ri:add-circle-line"
              size="sm"
              color="gray"
              variant="solid"
              label="Generate"
              :trailing="false"
              :disabled="textInput.length <= 0"
              @click="generate"
          />

          <UButton
              icon="ri:file-download-line"
              size="sm"
              color="gray"
              variant="solid"
              label="Download"
              :trailing="false"
              :disabled="!qrResult"
              @click="downloadSVG"
          />
        </div>
      </template>
    </UCard>

  </main>
</template>