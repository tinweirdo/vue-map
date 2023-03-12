<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useMap } from '../hooks/map';
import { useLayer } from '../hooks/pipeline-layer';
const props = defineProps({ pipeline: Object })
const { map } = useMap()
const { layer } = useLayer()

layer.value.addData(props.pipeline.data, { style: () => ({ color: 'red' }) })

onUnmounted(() => {
    // rm current pipeline after unmounted
})
</script>